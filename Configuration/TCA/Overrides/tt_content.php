<?php

declare(strict_types=1);

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') || die();

(static function (): void {
    $ll = 'LLL:EXT:gsb_kern/Resources/Private/Language/locallang_db.xlf:';

    // Frame variants rendered as KERN alert boxes / surface background, see Resources/Private/Content/Layouts/Default.html
    foreach (['box-info', 'box-success', 'box-warning', 'box-danger', 'surface'] as $frameClass) {
        ExtensionManagementUtility::addTcaSelectItem(
            'tt_content',
            'frame_class',
            ['label' => $ll . 'frame_class.' . $frameClass, 'value' => $frameClass]
        );
    }
})();
