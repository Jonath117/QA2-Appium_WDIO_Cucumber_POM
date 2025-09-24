
Feature: Gestión de alarmas
Background:
    Given Estoy en la pestaña de alarmas

  @addAlarm
  Scenario: Crear una nueva alarma
    When Creo una alarma a las "7" horas y "30" minutos
    Then La alarma a las "7":"30" debería estar visible
    
  @cancelAlarm  
  Scenario: Cancelar la creación de una alarma
    When Cancelo la creación de una alarma a las "8" horas y "00" minutos
    Then La alarma a las "8":"00" no debería existir  

  @deleteAlarm
  Scenario: Eliminar una alarma existente
    When Elimino la alarma a las "7":"30"
    Then La alarma a las "7":"30" no debería existir

  @deleteAlarmIndependiente
  Scenario: Eliminar una alarma existente
    When Creo una alarma a las "9" horas y "30" minutos
    Then La alarma a las "9":"30" debería estar visible
    When Elimino la alarma a las "9":"30"
    Then La alarma a las "9":"30" no debería existir  