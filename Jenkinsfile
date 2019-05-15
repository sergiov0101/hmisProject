node{
    stage('checkout del repositorio git'){
            checkout scm
    }
    stage('Elimino contenedores antiguos'){
        try{
            sh 'docker stop $(docker ps -a -q)'
            echo 'Detenidos contenedores'
        }
        catch(Exception e){
            echo 'No hay contenedores que detener'
        }

        try{
            sh 'docker rm $(docker ps -a -q)'
            echo 'Eliminados contenedores'
        }
        catch(Exception e){
           echo 'No hay contenedores que eliminar'
        }
    }
    stage('Contruccion del proyecto'){
        sh 'docker-compose build'
    }
        stage('Levantar contenedores'){
        sh 'docker-compose up -d'
    }

}
