
import Detail from './Detail.js'
export default class Task{
    constructor(el) {
       
        this._el = el;
        this._index = this._el.dataset.jsTask;
        this._elBtnShowDetail = this._el.querySelector('[data-js-show-detail]');
        this._elBtnDelete = this._el.querySelector('[data-js-delete]');
        this.elDetailSection = document.querySelector('[data-js-section-detail]');
        this.elDetailInfo = document.querySelector('[data-js-task-detail]');
        this._elChevron = this._el.querySelector('[data-js-chevron]');
        this._data = '';
        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
      
        /* bouton Afficher détails */
       this._elBtnShowDetail.addEventListener('click', function () { 
            this.changeUrl(this._index);
        }.bind(this));

        /* bouton supprimer tâche */
        this._elBtnDelete.addEventListener('click', this.delete.bind(this));
    }

    /**
     * Affiche le détail d'une tâche
     */
     changeUrl(id) {
        window.location = `#!/id/${id}`;
        if (this.elDetailSection.classList.contains('detail--ferme')) {
            new Detail(this.elDetailSection).showHideDetail(); 
        }

    }
    /**
     * Supprime la tâche 
     */
    delete(){
         console.log('delete');
         this._data = {	
            action : 'delete',
            id: encodeURIComponent(this._el.dataset.jsTask)
        }
        
        /*Redéfinition de quelques options pour la reqûete en POST en format json */
        let myInit = { 
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this._data)  
        }

        /* Appel asynchrone fetch */
        fetch('requetes/requetesAsync.php', myInit)
            .then(function(response) {
                //console.log(response)
                if (response.ok){
                    return response;
                }
                else throw new Error('La réponse n\'est pas OK');
            })
            .then(function(data) {
                this._el.remove();
                this.elDetailInfo.innerHTML = '';
                new Detail(this.elDetailSection).showHideDetail(); 
            }.bind(this))
            .catch(function(error) {
                console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
            });
    }

}




