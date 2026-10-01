<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') || die();

$GLOBALS['TYPO3_CONF_VARS']['RTE']['Presets']['gsb_kern'] = 'EXT:gsb_kern/Configuration/RTE/GsbKern.yaml';

// EXT:form templates in KERN markup, after GSB's form configuration (110–125)
ExtensionManagementUtility::addTypoScriptSetup('
    plugin.tx_form.settings.yamlConfigurations.130 = EXT:gsb_kern/Configuration/Form/KernFormSetup.yaml
    module.tx_form.settings.yamlConfigurations.130 = EXT:gsb_kern/Configuration/Form/KernFormSetup.yaml
');
