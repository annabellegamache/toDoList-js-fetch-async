import App from './App.js';
import FormValidator from "./FormValidator.js";
import Task from "./Task.js";


export default class Form extends App {
    constructor(el) {
        super();
        this._el = el;
        this._elInputTask = this._el.task;
        this._elInputDescription = this._el.description;
        this._elInputImportance = this._el.querySelectorAll('input[name="importance"]');
        this._elBouton = this._el.querySelector('[data-js-btn]'); 
        this._elDomTache = '';
        this._elToDoList = document.querySelector('[data-js-tasks]');

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        this._elBouton.addEventListener('click', function(e) {
            e.preventDefault();
            /* Si valide */
            let estValide  = new FormValidator(this._el).valideForm(); 
            if (estValide) {
                this.addTask();
                this._el.reset();
            }
        }.bind(this));
    }


   


    /**
     * Ajoute la tâche au tableau toDoList et appelle la méthode pour injecter la nouvelle tâche
     */
    addTask() {
        let task = {
            tache: this._elInputTask.value,
            description: this._elInputDescription.value,
            importance: this._el.querySelector('input[name="importance"]:checked').value
        }

       
        /* Récupère les valeurs du formulaire*/
        this._data = {	
            action : 'add',
            tache: encodeURIComponent(this._elInputTask.value),
            description: encodeURIComponent(this._elInputDescription.value),
            importance:this._el.querySelector('input[name="importance"]:checked').value
        }




        /* Redéfinition de quelques options pour la reqûete en POST en format json*/
        let myInit = { 
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this._data)  
        }

        /*Appel asynchrone fetch*/
        fetch('requetes/requetesAsync.php', myInit)
            .then(function(response) {
                if (response.ok) return response.text();
                else throw new Error('La réponse n\'est pas OK');
            })
            .then(function(id) {
                new Task(this.createTask(id));
                //reset
                this._elInputTask.value ='';
                this._elInputDescription.value = '';
                this._el.querySelectorAll('input[name="importance"]').checked = false;
            }.bind(this))
            .catch(function(error) {
                console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
            });
    }
       
}