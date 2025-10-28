Feature: Gestion temporizador
Background:
    Given estoy en la pagina Temporizador


@CrearyEliminarTemp
Scenario: Eliminar un temporizador independiente
    When creo un temporizador con "5" minutos y "00" segundos
    Then el temporizador inicia
    Then el temporizador se pausa
    Then el temporizador deberia mostrar el boton de Continuar y poder continuar
    When elimino el temporizador
    Then el temporizador que cree no deberia existir
