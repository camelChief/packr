<script lang="ts">
	export let color = 'currentColor';
	export let size = 24;
	export let strokeWidth = 2;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 6.35 6.35"
	fill="none"
	stroke={color}
	stroke-width={.529 * (strokeWidth / 2)}
	stroke-linejoin="round"
>
    <path
		d="M3.175 5.821l1.323-.529.265-.794.794-.265s0-1.852-.529-1.852c.088-.529 0-1.058-.265-1.587-.706.353-1.058.706-1.058 1.058H2.646c0-.353-.353-.706-1.058-1.058-.265.529-.353 1.058-.265 1.587-.529 0-.529 1.852-.529 1.852l.794.265.265.794z"
	/>
    <path d="M2.91 4.233l.265.265.265-.265z" />
    <path
		d="M2.117 3.44h0m2.116 0h0"
		stroke-linecap="round"
	/>
</svg>
