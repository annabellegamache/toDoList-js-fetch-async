import App from './App.js';
import Task from './Task.js';

export default class SortTasks extends App {
    constructor(el) {
        super();
        this._el = el;
        this._elBtnsSort = this._el.querySelectorAll('[data-js-sort]');
        this._elToDoList = document.querySelector('[data-js-tasks]');
        this._data = '';

        this.init();
    }


    /**
     * Initialise les comportements
     */
    init() {
        for (let i = 0, l = this._elBtnsSort.length; i < l; i++) {
            this._elBtnsSort[i].addEventListener('click', function(e) {
                let ordre = e.target.dataset.jsSort;
                console.log(ordre);
                this.sort(ordre);
            }.bind(this));
        }
    }


    /**
     * Réordonne le tableau toDoList et appelle la méthode pour injecter les tâches mises à jour
     * @param {string} column 
     */
    sort(column) {
        
        this._data = {
            action: 'trier',
            col: encodeURIComponent(column)
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
                console.log(data[0].id);
                 //console.log(data);
                this._elToDoList.innerHTML = '';
                for (let i = 0, l = data.length; i < l; i++) {
                    this._data = data[i];
                    new Task(this.createTask(this._data.id));  
                }

            }.bind(this))
            .catch (function(error) {
                console.log(`Il y a eu un problème avec l'opération fetch: ${error.message}`);
            });
    }
}