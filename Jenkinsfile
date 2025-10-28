pipeline {
    agent any
    
    // ⚠️ Importante: Define las variables de entorno de BrowserStack usando las credenciales de Jenkins
    environment {
        BROWSERSTACK_CREDS = credentials('BROWSERSTACK_CREDS')
    }

    stages {
        
        stage('Checkout') {
            steps {
                // Obtiene tu código fuente
                git url: 'https://github.com/Jonath117/QA2-Appium_WDIO_Cucumber_POM.git', branch: 'jenkins-pipeline'
            }
        }
        
        stage('Instalar Dependencias') {
            steps {
                bat 'npm install @wdio/browserstack-service'
                bat 'npm install'
            }
        }
        
        stage('Ejecutar Pruebas BrowserStack') {
            steps {
                echo 'Ejecutando pruebas Appium/WDIO en BrowserStack...'
                
                // ⚠️ Se ejecuta WDIO, que automáticamente usará las variables BROWSERSTACK_USERNAME y BROWSERSTACK_ACCESS_KEY 
                // definidas en la sección 'environment' del pipeline.
                bat "set BROWSERSTACK_USERNAME=%BROWSERSTACK_CREDS_USR%&& set BROWSERSTACK_ACCESS_KEY=%BROWSERSTACK_CREDS_PSW%&& npx wdio run wdio.conf.js"
            }
        }
        
    stage('Generar Reporte Allure') {
        steps {
            // Usa la herramienta nombrada 'Allure' que configuraste en Jenkins
            tool 'Allure'
            bat 'allure generate allure-results --clean -o allure-report'
        }
    }
    }
    
post {
    always {
            echo 'Publicando reporte Allure en Jenkins...'
            
            // CORRECCIÓN: Usa la sintaxis de lista de Maps (la más robusta y segura)
            allure([
                results: [[path: 'allure-results']], // La lista de paths de resultados brutos
                report: 'allure-report'              // Directorio de la generación final
            ])
        }
    failure {
        echo '¡Las pruebas fallaron!'
    }
    // ...
}
}