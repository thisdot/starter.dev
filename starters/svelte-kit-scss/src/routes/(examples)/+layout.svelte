<div>
	<slot />
	<div>
		<a href="/">Return Home</a>
	</div>
</div>

<style lang="scss">
	div {
        text-align: center;
		margin: 10px 0;
		
		a {
			font-size: 1.2rem;
			color: rgb(37 99 235);
			&:hover {
				color: rgb(30 64 175);
				text-decoration: underline;
			}
		}
	}
</style>
