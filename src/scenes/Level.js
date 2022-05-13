
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// gameReady
		const gameReady = this.add.text(400, 408, "", {});
		gameReady.setOrigin(0.5, 0.5);
		gameReady.text = "GAME IS READY";
		gameReady.setStyle({ "fontFamily": "Arial", "fontSize": "30px" });

		// player1
		const player1 = new CroquetPlayer(this, 383, 476);
		this.add.existing(player1);

		this.gameReady = gameReady;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	gameReady;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();

		this.gameReady.x=this.cameras.main.centerX;

		console.log(this.game.allPlayers);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
