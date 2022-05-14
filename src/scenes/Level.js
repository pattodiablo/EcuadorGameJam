
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

		this.gameReady = gameReady;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	gameReady;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();
		this.physics.world.setBounds(0,0,3000,3000,true,true,true);
		this.cameras.main.setBounds(0, 0, 3000, 3000,true);


		this.gameReady.x=this.cameras.main.centerX;


		var CroquetPlayer1 = new CroquetPlayer(this, this.cameras.main.centerX-50, 476);
		if(!isPhaserDebug){
			CroquetPlayer1.id=this.game.allPlayers[0].sessionId;
		}
		this.add.existing(CroquetPlayer1);

		var LocalPlayerPrefab = new LocalPlayer(this,this.cameras.main.centerX+50, 476);
		if(!isPhaserDebug){
			LocalPlayerPrefab.id=this.game.allPlayers[1].sessionId;
		}
		//
		this.add.existing(LocalPlayerPrefab);

		this.cameras.main.startFollow(LocalPlayerPrefab);

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
