
// You can write more code here

/* START OF COMPILED CODE */

class LocalPlayer extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "player2", frame);

		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */
	create(){
		this.cursors = this.scene.input.keyboard.createCursorKeys();
	}

 update() {
	if (this.cursors.left.isDown)
    {
      
    }
    else if (this.cursors.right.isDown)
    {
      
    }

    if (this.cursors.up.isDown)
    {
       
    }
    else if (this.cursors.down.isDown)
    {
      
    }

}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
