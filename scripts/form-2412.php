<?php

require_once('FormProcessor.php');

$form = array(
    'subject' => 'Contacto - Creafinity',
    'email_message' => 'Gracias por comunicarte con Creafinity.
Nos pondremos en contacto a la brevedad.',
    'success_redirect' => '',
    'sendIpAddress' => true,
    'email' => array(
    'from' => 'contacto@creafinity.com.uy',
    'to' => 'contacto@creafinity.com.uy'
    ),
    'fields' => array(
    'name' => array(
    'order' => 1,
    'type' => 'string',
    'label' => 'Nombre',
    'required' => true,
    'errors' => array(
    'required' => 'Field \'Nombre\' is required.'
    )
    ),
    'email' => array(
    'order' => 2,
    'type' => 'email',
    'label' => 'Email',
    'required' => true,
    'errors' => array(
    'required' => 'Field \'Email\' is required.'
    )
    ),
    'message' => array(
    'order' => 3,
    'type' => 'string',
    'label' => 'Message',
    'required' => true,
    'errors' => array(
    'required' => 'Field \'Message\' is required.'
    )
    ),
    )
    );

    $processor = new FormProcessor('');
    $processor->process($form);

    ?>