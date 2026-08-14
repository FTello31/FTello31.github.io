export function carouselIndex(offset: number, slideWidth: number, slideCount: number) {
	if (slideWidth <= 0 || slideCount <= 1) return 0;
	return Math.max(0, Math.min(slideCount - 1, Math.round(offset / slideWidth)));
}
