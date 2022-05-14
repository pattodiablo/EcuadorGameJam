function loadGame(options){
    const Q = Croquet.Constants;
   
    Q.ValidateReadyRate = 1000;
  
 
class MirrorModel extends Croquet.Model {

    init() {

        this.allPlayers = new Array();
        this.allPlayerObjects =  new Array();
        this.neededUsersPerGame = 2;
        this.subscribe('gameNetwork',"confirmPlayer",this.storePlayer);
        this.subscribe(this.sessionId, "view-join", this.addUser);
        this.subscribe(this.sessionId, "view-exit", this.deleteUser);
        this.subscribe('gameNetwork',"isReady",  this.registerReadyPlayer);
        this.subscribe('gameNetwork','PlayerMoved',this.UpdatePlayerPosition);
        

        this.validarIfReadyAll()
    }

    UpdatePlayerPosition(playerPostiion){
       console.log(playerPosition);
    }

    addUser(id) {

        console.log(id + ' acaba de ingresar este user');

    }

    
		deleteUser(id) {



            const index =  this.allPlayers.indexOf(id);


            this.allPlayers.forEach((PlayerObject, j) => { 
                
                if(PlayerObject.sessionId == id){

                    var removedObject = this.allPlayers.indexOf(PlayerObject);

                    if (removedObject > -1) {
                       this.allPlayers.splice(removedObject, 1);
                    }
                }

            });

            if (index > -1) {
               this.allPlayers.splice(index, 1);
            }


            this.publish('gameNetwork',"removePlayer",this.allPlayers);
            console.log('user ' + id + ' has been removed from Model yeah');

     }

    storePlayer(sessionObject){
        console.log("sessionId " + sessionObject.sessionId)
        let canAddPlayer=true;
        console.log("usuarios registrados " + this.allPlayers.length)
            if(this.allPlayers.length>neededUsersPerGame-1){
                console.log("numero maximo de usuarios alcanzados");
            }else{
                this.allPlayers.forEach(player => {
            
                        if(player.sessionId==sessionObject.sessionId){
                        canAddPlayer=false;
                        }

                    });

                    if(canAddPlayer){
                        
                        this.allPlayers.push(sessionObject);
                        console.log('sesion registrada: ' +  sessionObject.nickName );
                        console.log(this.allPlayers);
                        this.publish('gameNetwork', "populatePlayers", this.allPlayers);
                    }else{
                        console.log("jugador ya existe");
                        console.log(this.allPlayers);
                        this.publish('gameNetwork', "populatePlayers", this.allPlayers);

                    }
                
            }
     
       
    }


    registerReadyPlayer(viewId){
        console.log("registrando ready a " + viewId)

        this.allPlayers.forEach(player => {
            
            if(player.sessionId==viewId){
            player.isReady=true;
            }

        });

    }


    
			validarIfReadyAll(){
             
                let cuantosReady=0;
                this.allPlayers.forEach(player => {
            
                    if(player.isReady){
                        cuantosReady++;
                    }
        
                });
                console.log(cuantosReady);
                if(cuantosReady>=neededUsersPerGame){
                 
                    this.future(Q.ValidateReadyRate).destroy();
                   this.publish('gameNetwork', "loadPhaserGame", this.allPlayers);
                }
                this.future(Q.ValidateReadyRate).validarIfReadyAll();
            }
    

     
}


MirrorModel.register("MirrorModel");


class ClientViews extends Croquet.View {

    constructor(model) {
        super(model);
        this.model =  model;
        this.subscribe('gameNetwork', "populatePlayers", this.populatePlayers);
        this.subscribe('gameNetwork',"removePlayer",this.populatePlayers);
        this.subscribe('gameNetwork', "loadPhaserGame", this.loadPhaserGame);

        this.game = null;
        croquetView = this;
        //this.crearJuego(this); //me paso croquet
     
        const nickNameField=document.getElementById("nickName").value;
        
        this.confirmPlayerAdded(this.viewId,nickNameField);
    
    }

        confirmPlayerAdded(sessionId, nickName){
          
            console.log('registrando en croquet usuario ' + sessionId + ' con nickName: ' + nickName);
            var sessionObject={ sessionId:sessionId, nickName:nickName}
            this.publish('gameNetwork',"confirmPlayer", sessionObject);
        }

        updatePosition(x,y){
            var playerPosition = [x,y];
            this.publish('gameNetwork','PlayerMoved',playerPosition);
        }

        populatePlayers(allPlayers){
			
            console.log('populando');
     
			nombreEnLoby(allPlayers);
			
			
		}

        sayReady(){
            console.log(this.viewId)
            this.publish('gameNetwork',"isReady", this.viewId);
        }

        loadPhaserGame(allPlayers){
        
          $('#lobbyScreen').remove()
            console.log("iniciando juego")
            initGame(allPlayers);
        }
		



}




const apiKey = "168sOIIM3fuIhJ8qgCiiqvpA9l0JImozIxAxl2AFc"; // paste from croquet.io/keys
const appId = "com.weveana.spacewalk";
const name = options.roomID;
const password = "12345";

Croquet.Session.join({apiKey, appId, name, password, model: MirrorModel, view: ClientViews});


document.addEventListener('touchstart', function(event){
event.preventDefault();
}, {passive: false});

}
