import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

const modules = [MatDatepickerModule, MatInputModule, MatNativeDateModule];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules]
})
export class MaterialModule {}
