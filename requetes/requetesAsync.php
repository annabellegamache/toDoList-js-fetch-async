<?php 
    require_once('fonctionsDB.php');

    $request_payload = file_get_contents('php://input');
    $data = json_decode($request_payload, true);

    if (isset($data['action'])){
       
        switch ($data['action']) {
            case 'add':
                if (isset($data['tache']) && isset($data['description']) && isset($data['importance']) ) {
                    $task = htmlspecialchars($data['tache']);
                    $description = htmlspecialchars($data['description']);
                    $importance = htmlspecialchars($data['importance']);
                    $return_id = addTache(0, $task, $description, $importance);
                    echo $return_id;
                }else{
                    echo 'Erreur query string';
                }  
                break;
            case 'affiche':
                if (isset($data['id'])) {
                    
                    $id = htmlspecialchars($data['id']);
                    $resultat = getTache($id);
                    $tache = mysqli_fetch_assoc($resultat);
                    echo json_encode($tache); 
                } 
                break;
            case 'trier':
                if (isset($data['col'])) {
                    
                    $resultat = getAllTaches($data['col']);
                    $taches = [];
                    while ($tache = mysqli_fetch_assoc($resultat)) {
                        $taches[] = $tache ; 
                    } 
                    echo json_encode($taches);     
                } 
                break;
            case 'delete':
                if (isset($data['id'])) {
                    $id = htmlspecialchars($data['id']);
                    deleteTache($id);
                } 
                break;
            default:
                echo 'Erreur query string';
            break;
        }
    } else {
        echo 'Erreur action';
    }
     
?>