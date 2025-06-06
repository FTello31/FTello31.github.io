import { Injectable, isDevMode } from '@angular/core';
import { LogLevel, PollingMode, User } from 'configcat-js';
import {
  createConsoleLogger,
  getClient,
  IConfigCatClient,
  IConfigCatClientSnapshot,
  SettingTypeOf,
  SettingValue,
} from 'configcat-js';
import { distinctUntilChanged, Observable, BehaviorSubject, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  public readonly client: IConfigCatClient;

  private readonly snapshotSubject =
    new BehaviorSubject<IConfigCatClientSnapshot | null>(null);
  readonly snapshot$ = this.snapshotSubject.asObservable();
  get currentSnapshot() {
    return this.snapshotSubject.value;
  }

  private defaultUser?: User;

  constructor() {
    // Setting log level to Info to show detailed feature flag evaluation
    const logger = createConsoleLogger(
      isDevMode() ? LogLevel.Info : LogLevel.Warn
    );

    // Cambiando a LazyLoad para cargar los flags solo cuando sea necesario
    this.client = getClient(environment.configCatClient, PollingMode.LazyLoad, {
      // El cacheTimeToLiveSeconds determina por cuánto tiempo se mantendrán los valores en caché
      cacheTimeToLiveSeconds: 3600,
      logger,
      setupHooks: (hooks) =>
        hooks.on('configChanged', () =>
          this.snapshotSubject.next(this.client.snapshot())
        ),
    });

    // Cargar los flags una vez al inicio de la aplicación
    this.loadFlags();
  }

  // Método para cargar los flags explícitamente
  async loadFlags() {
    await this.client.forceRefreshAsync();
    this.snapshotSubject.next(this.client.snapshot());
  }

  ngOnDestroy(): void {
    this.client.dispose();
  }

  setDefaultUser(user: User) {
    this.client.setDefaultUser((this.defaultUser = user));
    // Opcional: recargar los flags cuando se cambia el usuario
    this.loadFlags();
  }

  clearDefaultUser() {
    this.client.clearDefaultUser();
    this.defaultUser = void 0;
    // Opcional: recargar los flags cuando se elimina el usuario
    this.loadFlags();
  }

  getValue<T extends SettingValue>(
    key: string,
    defaultValue: T,
    user?: User
  ): Observable<SettingTypeOf<T>> {
    return this.snapshotSubject.pipe(
      map((snapshot) =>
        snapshot
          ? snapshot.getValue(key, defaultValue, user ?? this.defaultUser)
          : (defaultValue as SettingTypeOf<T>)
      ),
      distinctUntilChanged()
    );
  }

  getAllValues(user?: User): Observable<Map<string, SettingValue>> {
    return this.snapshotSubject.pipe(
      map((snapshot) =>
        snapshot
          ? // Evaluate feature flags and build a key-value map.
            snapshot
              .getAllKeys()
              .reduce(
                (keyValues, key) => (
                  keyValues.set(
                    key,
                    snapshot.getValue(key, void 0, user ?? this.defaultUser)
                  ),
                  keyValues
                ),
                new Map<string, SettingValue>()
              )
          : new Map<string, SettingValue>()
      ),
      distinctUntilChanged((prev, current) => {
        // Check if there are any changes compared to the previous key-value map.
        if (prev.size !== current.size) return false;
        for (const key of prev.keys()) {
          if (!current.has(key) || current.get(key) !== prev.get(key)) {
            return false;
          }
        }
        return true;
      })
    );
  }

  // Método opcional para forzar la recarga de flags cuando sea necesario
  reloadFlags() {
    return this.loadFlags();
  }
}
