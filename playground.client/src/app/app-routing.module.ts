import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{
  //  path: 'testflac',
  //  loadComponent: () => import('../app/test-flac/test-flac.component')
  //    .then(mod => mod.TestFlacComponent)
  //}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
