Ajout d'une sauvegarde d'un historique a chaque fois que un fichier est modifié, crée deux fichiers, un en .txt l'autre en .json.

Amelioration possible, charger ce fichier pour réafficher les précédentes modification, utilisation plutôt du fichier .json pour ajouter les 
informations dans le tableau edits[] du HistoryService.

Le fichier modifier est le relay.js au niveau du onFilechanged.