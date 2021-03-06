import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddArtifactRepoComponent } from './modals/add-artifact-repo/add-artifact-repo.component';
import { RepoDetailsComponent } from './pages/repo-details/repo-details.component';
import { ArtifactDetailsComponent } from './pages/artifact-details/artifact-details.component';
import { SearchComponent } from './pages/search/search.component';
import { DTagComponent } from './components/d-tag/d-tag.component';
import { ArtifactVersionComponent } from './pages/artifact-version/artifact-version.component';

import { MarkdownModule } from 'ngx-markdown';
import { RepoArtifactsComponent } from './pages/repo-artifacts/repo-artifacts.component';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { ArtifactEditComponent } from './pages/artifact-edit/artifact-edit.component';
import { TagsComponent } from './common/tags/tags.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    AddArtifactRepoComponent,
    RepoDetailsComponent,
    ArtifactDetailsComponent,
    ArtifactVersionComponent,
    RepoArtifactsComponent,
    SearchComponent,
    DTagComponent,
    BreadcrumbComponent,
    ArtifactEditComponent,
    TagsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzModalModule,
    NzFormModule,
    NzGridModule, NzNotificationModule,
    NzButtonModule, NzInputModule, NzPageHeaderModule, NzBreadCrumbModule, NzAvatarModule, NzTagModule, NzTabsModule, NzDescriptionsModule, NzStatisticModule,
    NzDropDownModule, NzTableModule, NzSkeletonModule, NzPopconfirmModule,
    MarkdownModule.forRoot()
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
