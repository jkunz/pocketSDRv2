import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deeplinks } from '@ionic-native/deeplinks';

import { CompanyLoginPage } from '../pages/company-login/company-login';
import { VarDetailsPage } from '../pages/var-details/var-details';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';

import { PageKeeperServiceProvider } from '../providers/page-keeper-service/page-keeper-service';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';

@Component({
  templateUrl: 'app.html',
  providers: [PageKeeperServiceProvider],  
})
export class MyApp {
  rootPage:any = TabsPage;  
  @ViewChild(Nav) nav: Nav;  
  pages: Array<{title: string, component: any, index?: number}>;
  tutorialSelection:any;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuCtrl:MenuController, public events:Events, public pageKeeper:PageKeeperServiceProvider, public deeplinks:Deeplinks, public storageService:StorageServiceProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
        // This requires installation of https://github.com/driftyco/ionic-plugin-keyboard
        // and can only affect native compiled Ionic2 apps (not webserved).

      this.pages = [
        { title: 'Add/Update Company', component: CompanyLoginPage },
        { title: 'Company Selection', component: TabsPage, index: 0 },
        { title: 'Report Suite Selection', component: TabsPage, index: 1 },
        { title: 'Variables', component: TabsPage, index: 2 },
        { title: 'Variable Details', component: VarDetailsPage },
        { title: 'About this app', component: AboutPage }
      ];
      splashScreen.hide();
    });
  }

  openPage(page){
    if(page.title == "Company Selection" || page.title == "Report Suite Selection" || page.title == "Variables"){
      this.nav.setRoot(page.component, { index: page.index });
    }else{
      this.nav.push(page.component);      
    }
  }

  tutorialToggle(){
    this.storageService.addToStorageSimple("tutorial",this.storageService.tutorial)
    this.menuCtrl.close()
  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {

    let routes={'/pocketSDR/APIshortcut' : CompanyLoginPage}

    this.deeplinks.route(routes).subscribe((match)=>{
      this.nav.setRoot(CompanyLoginPage,match.$args);
    },(nomatch) => {
      console.log("v5: didn't match",JSON.stringify(nomatch))
    });
    })
  }
}