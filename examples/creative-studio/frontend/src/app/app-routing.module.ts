/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './common/services/auth.guard.service';
import {ArenaComponent} from './arena/arena.component';
import {AdminAuthGuard} from './admin/admin-auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'fun-templates',
    loadChildren: () =>
      import('./fun-templates/fun-templates.module').then(
        m => m.FunTemplatesModule,
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'video',
    loadChildren: () =>
      import('./video/video.module').then(m => m.VideoModule),
    canActivate: [AuthGuardService],
  },
  {path: 'arena', component: ArenaComponent, canActivate: [AuthGuardService]},
  {
    path: 'vto',
    loadChildren: () => import('./vto/vto.module').then(m => m.VtoModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'audio',
    loadChildren: () =>
      import('./audio/audio.module').then(m => m.AudioModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'gallery',
    loadChildren: () =>
      import('./gallery/gallery.module').then(m => m.GalleryModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
