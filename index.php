<!DOCTYPE html>
<html lang="fr_CA">
<head>
    <!-- meta -->
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>TP2 | Annabelle Gamache</title>
	<meta name="description" content="TP2 du cours 582-31F-MA Programmation d'interface Web 2">

	<!-- styles -->
	<link rel="stylesheet" type="text/css" href="./assets/styles/styles.css">

	<!-- scripts 
	<script src="./assets/scripts/toDoListArray.js"></script>
	<script src="./assets/scripts/App.js"></script>
	<script src="./assets/scripts/Detail.js"></script>
	<script src="./assets/scripts/Task.js"></script>
	<script src="./assets/scripts/Form.js"></script>
	<script src="./assets/scripts/SortTasks.js"></script>
	<script src="./assets/scripts/main.js" defer></script>-->

    <!-- scripts -->
    <script type="module" src="./assets/scripts/main.js" defer></script>



</head>

<body>
	<header>
		<h1>TP2</h1>
        <h3>par Annabelle Gamache 0239070</h3>
        <p>Un gestionnaire de tâches (to-do-list) en POO.</p>
        <hr>
	</header>
	<main data-js-component="Rputer">

        <section>
            <h3>Ajouter une tâche</h3>
            <form data-js-form data-js-component="Form">
                <div>
                    <label for="task">Nouvelle tâche : </label>
                    <input type="text" id="task" name="task">
                </div>

                <div>
                    <label for="description">Description : </label>
                    <input type="text" id="description" name="description">
                </div>

                <div>
                    <label for="haute">Haute : </label>
                    <input type="radio" id="haute" name="importance" value="1">
                    <label for="moyenne">Moyenne : </label>
                    <input type="radio" id="moyenne" name="importance" value="2">
                    <label for="basse">Basse : </label>
                    <input type="radio" id="basse" name="importance" value="3">
                </div>

                <div>
                    <button data-js-btn>Ajouter</button>
                </div>
            </form>
        </section>

        <section class="to-do-list">
            <h3>Liste des tâches</h3>

            <div data-js-tasks data-js-component="Task">

            <?php
			require_once('./requetes/fonctionsDB.php');
            $id = 'id';
			$taches = getAllTaches($id);

			while ($tache = mysqli_fetch_assoc($taches)) {

				echo '<div data-js-task="' . $tache['id'] . '" >
                            <p>
                                <span>
                                    <small>Tâche : </small>' . $tache['tache'] . '
                                </span>
                                -
                                <span>
                                    <small>Importance : </small>' . $tache['importance'] . '
                                </span>
                                <button data-js-show-detail="' . $tache['id'] . '">Afficher le détail</button>
                                <button data-js-delete="' . $tache['id'] . '">Supprimer</button>
                            </p>
                        </div>';
			}
		?>

            </div>

            <div class="to-do-list__actions" data-js-sort-tasks data-js-component="SortTasks">
                <button data-js-sort="tache">Trier par ordre alphabétique</button>
                <button data-js-sort="importance">Trier par importance</button>
            </div>
        </section>

        <section class="detail detail--ferme" data-js-section-detail data-js-component="Detail">
            <h3>Détail d'une tâche</h3>

            <div class="chevron chevron--top" data-js-chevron></div>

            <div class="detail__result" data-js-task-detail></div>

        </section>

        <template data-js-task-template>
            <div class="detail__info">
                <p><small>Tâche : </small>{{tache}}</p>
                <p><small>Description : </small>{{description}}</p>
                <p><small>Importance : </small>{{importance}}</p>
            </div>
        </template>

</body>
</html>