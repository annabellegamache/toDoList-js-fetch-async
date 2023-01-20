export default class App {

    /**
     * Construit, injecte une nouvelle tâche
     * @param {int} id 
     *  @returns 
     */
    createTask(id) {
        this._elDomTache = `<div data-js-task="${id}">
                                        <p>
                                            <span>
                                                <small>Tâche : </small>${this._data.tache}
                                            </span>
                                            -
                                            <span>
                                                <small>Importance : </small>${this._data.importance}
                                            </span>
                                            <button data-js-show-detail="1">Afficher le détail</button>
                                            <button data-js-delete="1">Supprimer</button>
                                        </p>
                                    </div>`;
        
                this._elToDoList.insertAdjacentHTML('beforeend', this._elDomTache)
                return this._elToDoList.lastElementChild;
    }
}

