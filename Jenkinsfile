node{
    stage('checkout del repositorio git'){
            checkout scm
    }
    stage('Elimino contenedores antiguos'){
        try{
            sh 'docker rm $(docker ps -a -q)'
        }
        catch(exc){
            echo 'No hay contenedores que eliminar'
            throw
        }
    }
    stage('Contruccion del proyecto'){
        sh 'docker-compose build'
    }
        stage('Levantar contenedores'){
        sh 'docker-compose up -d'
    }

}
