

export default class FormValidato{
    constructor(el) {
        this._el = el;
        this._elInputTask = this._el.task;
        this._elInputDescription = this._el.description;
        this._elInputImportance = this._el.querySelectorAll('input[name="importance"]')
        this.valide = true;
    }

    /**
     * Validation du formualaire
     * @returns 
     */
  valideForm() {

    /* Input 'Nouvelle tâche' */
    if (this._elInputTask.value == '') {
        this._elInputTask.parentNode.classList.add('error');
        this.valide = false;
    } else {
        if (this._elInputTask.parentNode.classList.contains('error')) this._elInputTask.parentNode.classList.remove('error');
    }

    console.log(this._elInputImportance);

     // Valide si un radio/checkbox a été coché
     let isChecked = false;
     for (let i = 0, l = this._elInputImportance.length; i < l; i++) {
        if (this._elInputImportance[i].checked) isChecked = true;
    }

    /* Inputs Radio 'Importance' */
    if (isChecked) {
        if (this._elInputImportance[0].parentNode.classList.contains('error')) this._elInputImportance[0].parentNode.classList.remove('error');
    } else {
        this._elInputImportance[0].parentNode.classList.add('error');
        this.valide = false;
    }

    return this.valide;
}
       
}