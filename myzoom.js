(function() {
	function MyZoom(node) {
		this.node = node;
		this.zoom = null;
		this._class = 'uzoom';
		this.offset = {
			x: 0,
			y: 0
		}
	}
	
	MyZoom.prototype.handleMove = function(e) {
		if (this.zoom === undefined || this.zoom === null) {
			this.zoom = document.createElement('div');
			document.querySelector('body').appendChild(this.zoom);
		}
		
		if (this.zoom.className != this._class) {
			this.zoom.className = this._class;
		} 
		
		let backgroundUrl = `url(${this.node.src})`;
		
		if (this.zoom.style.backgroundImage != backgroundUrl) {
			this.zoom.style.backgroundImage = backgroundUrl;	
			this.offset.x = Math.round(this.zoom.offsetWidth / 2);
			this.offset.y = Math.round(this.zoom.offsetHeight / 2);
		}
		
		let x = this.node.offsetWidth - e.offsetX + this.offset.x;
		let y = this.node.offsetHeight - e.offsetY + this.offset.y;
		
		this.zoom.style.backgroundPosition = `left ${x}px top ${y}px`;
		this.zoom.style.left = `${e.clientX}px`;
		this.zoom.style.top = `${e.clientY}px`;
	}
	
	MyZoom.prototype.handleOut = function(e) {
		if (this.zoom !== undefined && this.zoom !== null) {
			if (this.zoom.parentNode != null && this.zoom.parentNode != undefined) {
				this.zoom.parentNode.removeChild(this.zoom);
				this.zoom = null;
			}
		}
	}
	
	MyZoom.prototype.attach = function() {
		this.node.addEventListener('mousemove', (e) => { this.handleMove(e) });
		this.node.addEventListener('mouseout', (e) => { this.handleOut(e)});
	}
})();
