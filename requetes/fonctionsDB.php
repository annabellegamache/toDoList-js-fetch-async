<?php
	$connexion = connectDB();
	
	function connectDB() {

		/* dev */
		/*define('DB_HOST', 'localhost');
		define('DB_USER', 'root');
		define('DB_PASSWORD', '');			// Windows
		define("DBNAME", "to-do-list");*/


		/*WEBDEV*/
		define("DB_HOST", "localhost");
		define("DB_USER", "e0239070");
		define("DB_PASSWORD", "4XhID4YoZkyycWCVsFun");
		define("DBNAME", "e0239070");



		$laConnexion = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);
				
		if (!$laConnexion) {
			// La connexion n'a pas fonctionné
			die('Erreur de connexion à la base de données. ' . mysqli_connect_error());
		}
		
		$selected = mysqli_select_db($laConnexion, DBNAME);

		if (!$selected) {
			die('La base de données n\'existe pas.');
		}
		
		mysqli_query($laConnexion, 'SET NAMES "utf8"');
		return $laConnexion;
	}
	

	/**
	 * On recoit une requete sql, on l'execute et retourne le resultat.
	 * Si $last est true, on retourne plutot l'id du dernier item inseré.
	 * @param $requete
	 * @param false $last
	 * @return bool|int|mysqli_result|string
	 */
	function executeRequete($requete, $last = false) {
		global $connexion;
		if ($last) {
			mysqli_query($connexion, $requete);
			return $connexion->insert_id;
		} else {
			$resultats = mysqli_query($connexion, $requete);
			return $resultats;
		}
	}
	
	function getAllTaches($col) {
		return executeRequete("SELECT id, tache, description, importance FROM taches ORDER BY `$col` ASC");		
	}

	function getTache($id) {
		return executeRequete("SELECT id, tache, description, importance FROM taches WHERE id = '$id'");		
	}

	function addTache($id, $tache, $description, $importance) {
		return executeRequete("INSERT INTO taches (id,  tache, description, importance) 
							   VALUES ('$id', '$tache', '$description', '$importance')", true); //return dernier id insérer
	}

	function changeTache($id, $tache, $description, $importance) {
		return executeRequete("UPDATE taches 
							   SET tache = '$tache',
							   	   description = '$description',
								   importance = '$importance'
							   WHERE id = '$id'");
	}

	function deleteTache($id) {
		return executeRequete("DELETE FROM taches WHERE id = '$id'");
	}
?>