node{
    stage('checkout del repositorio git'){
            //Checkout del repositorio configurado 
            checkout scm
    }
    stage('Eliminar contenedores antiguos'){
        try{
            //Se detienen los contenedores que esten en ejecucion
            sh 'ls'
            sh 'docker stop $(docker ps -a -q)'
            echo 'Detenidos contenedores'
        }
        catch(Exception e){
            echo 'No hay contenedores que detener'
        }

        try{
            //Se eliminan los contenedores que existan 
            sh 'docker rm $(docker ps -a -q)'
            echo 'Eliminados contenedores'
        }
        catch(Exception e){
           echo 'No hay contenedores que eliminar'
        }
    }
    stage('Contruccion del proyecto '){
        //Se contruye el proyecto docker
        dir('BACKEND') {
            sh 'docker-compose build'
        }
        
    }
        stage('Levantar contenedores'){
        //Se levantan los contenedores
        sh 'docker-compose up -d'
    }

}
