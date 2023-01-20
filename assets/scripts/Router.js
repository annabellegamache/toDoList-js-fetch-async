import Detail from './Detail.js'
export default class Router{

    constructor(){
        this._elTaskDetail = document.querySelector('[data-js-task-detail]');
        this._elTaskTemplate = document.querySelector('[data-js-task-template]');
        this.elDetailSection = document.querySelector('[data-js-section-detail]');

        //recupere le domaine de base
        if (location.hostname == 'localhost') {
            this._domain = `${location.pathname.substring(0, location.pathname.lastIndexOf('_tp2'))}_tp2/` ;
        } else {
            this._domain = location.pathname;
        }

        console.log(this._domain);

        this.init();
    }

    init(){

        /**
         *  Comportement au chargement de la page
         */
         let id = this.getIdInHash('id')
         if (id)  this.showDetail(id);
           

        /**
         *  Comportement suite a l'event hashchange
         */
         window.addEventListener('hashchange', function(){
            let id = this.getIdInHash('id');
            this.showDetail(id);/* appel de la méthode importer dans Task selon le id */
        }.bind(this))
    }


    showDetail(id) {
        
            this._data = {
                action: 'affiche',
                id: id
            }

            let myInit = { 
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(this._data)  
            }
    
            fetch('requetes/requetesAsync.php', myInit)
                .then (function(response) {
                    if (response.ok) return response.json();
                    else throw new Error('La réponse n\'est pas OK');
                })
                .then (function(data) {
                    console.log(data);
                    if(data){
                        let cloneTemplate = this._elTaskTemplate.cloneNode(true);

                        for (const cle in data) {
                            let regEx = new RegExp('{{' + cle + '}}', 'g');
                            cloneTemplate.innerHTML = cloneTemplate.innerHTML.replace(regEx, data[cle])
                        }

                        this._elTaskDetail.innerHTML = '';
                        let elNewTask= document.importNode(cloneTemplate.content, true);
                        this._elTaskDetail.append(elNewTask);
                        if (this.elDetailSection.classList.contains('detail--ferme')) {
                            new Detail(this.elDetailSection).showHideDetail(); 
                        }
                    }else{
                        if (this.elDetailSection.classList.contains('detail--ouvert')) {
                            new Detail(this.elDetailSection).showHideDetail(); 
                        }
                        //clearurl
                        window.history.replaceState({}, '', this._domain);
                    }
                }.bind(this))
                .catch (function(error) {
                    console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
                });
        
     }
 

     /*recuperer le fragment apres #!*/
    getIdInHash(slug){
        let hash = window.location.hash,
        hashInArray = hash.split(`#!/${slug}/`), 
        id = hashInArray[1];
        return id;
    }



    




}