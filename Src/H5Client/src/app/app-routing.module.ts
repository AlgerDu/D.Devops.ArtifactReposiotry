import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RepoDetailsComponent } from './pages/repo-details/repo-details.component';
import { ArtifactDetailsComponent } from './pages/artifact-details/artifact-details.component';
import { SearchComponent } from './pages/search/search.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/search' },
  { path: 'search', component: SearchComponent },
  { path: 'repo/:code', component: RepoDetailsComponent },
  { path: 'repo/:code/artifacts/:artifactName', component: ArtifactDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
