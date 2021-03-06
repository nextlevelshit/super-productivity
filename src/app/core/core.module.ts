import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersistenceModule } from './persistence/persistence.module';
import { ChromeExtensionInterfaceModule } from './chrome-extension-interface/chrome-extension-interface.module';
import { SnackModule } from './snack/snack.module';
import { RouterModule } from '@angular/router';
import { NotifyModule } from './notify/notify.module';
import { LocalBackupModule } from '../imex/local-backup/local-backup.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PersistenceModule,
    ChromeExtensionInterfaceModule,
    SnackModule,
    NotifyModule,
    LocalBackupModule,
  ],
  exports: [
    PersistenceModule,
    ChromeExtensionInterfaceModule,
    SnackModule,
    NotifyModule,
  ],
})
export class CoreModule {
}
