import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChecklistProviderService} from '../checklist/checklist-provider.service';
import {Checklist} from '../checklist/checklist';
import {ChecklistContent} from '../checklist/checklist-content';
import {ChecklistItem} from '../checklist/checklist-item';
import {ChecklistStatus} from '../checklist/checklist-status.enum';
import {ChecklistSection} from '../checklist/checklist-section';
import {HttpClient} from '@angular/common/http';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {Storage} from '@ionic/storage';
import { CognitoService } from '../login/cognito.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

/**
 * Class to handle form pages events such as click, and update the data stored based on user action.
 */
@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  private routeParams = {
    'prepost': '',
    'section': '',
    'subsection': ''
  };


  /**
   * The instance of checklist that is currently being edited
   */
  private currentList: Checklist;
  @ViewChild(SignaturePad) private signaturePad: SignaturePad;
  private signaturePadOptions: Object = { // Check out https://github.com/szimek/signature_pad
      'minWidth': 2,
      'canvasWidth': 500,
      'canvasHeight': 200,
      'backgroundColor': '#ebebff',
      'penColor': '#000000'
  };

  constructor(
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private checklistProvider: ChecklistProviderService,
    private router: Router,
    private httpClient: HttpClient,
    private alertController: AlertController,
    private camera: Camera,
    public navCtrl: NavController,
    private cognito: CognitoService,
    private loadingController: LoadingController,
    private signature: string,
    private drawing: boolean
  ) {
    this.currentList = checklistProvider.getCurrentChecklist();
  }
  // image: any = '';
  base64Image: string;


  fetchList(id: number) {
    this.storage.set(('form' + id), this.currentList); // (temporary) stores entire form into storage
    this.httpClient.get('https://fpj3vmv77e.execute-api.us-west-2.amazonaws.com/default/dvir/')
      .subscribe(o => {
        console.log(o);
      });
  }

  printList() {
    console.log(JSON.stringify(this.checklistProvider.getCurrentChecklist().toDBFormat()));
  }

  /**
   * Replaces/loads currentList with the specified checklist object
   * @param checklist is the checklist object to load
   */
  loadChecklist(checklist: Checklist): void {
    this.currentList = checklist;
  }

  /**
   * Show a pop up message about the status of the save.
   *
   * @param message the message to show in the alert box
   */
  async saveAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Save',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  /**
   * Returns a loading overlay for log in.
   */
  async presentLoading() {
    return await this.loadingController.create({
      message: 'Saving...',
      duration: 5000
    });
  }

  /**
   * Publish a new checklist to the database.
   *
   * @param checklist The checklist to publish
   */
  async publish(checklist: ChecklistContent) {
    const loading = this.presentLoading();
    await loading.then(v => {
      v.present();
    });
    this.httpClient.post(
      'https://1wjbm8q1bk.execute-api.us-west-2.amazonaws.com/latest/forms/',
      checklist.toDBFormat(),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).subscribe(r => {
        this.loadingController.dismiss();
        this.saveAlert('Save Success').then();
        console.log(r);
      }, e => {
        this.loadingController.dismiss();
        console.log(checklist.toDBFormat());
        this.saveAlert('Save Failed' + JSON.stringify(e));
      });
    // this.cognito.access(t => {
    //   this.httpClient.post(
    //     'https://1wjbm8q1bk.execute-api.us-west-2.amazonaws.com/latest/forms/',
    //     checklist,
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         token: t
    //       }
    //     }).subscribe(r => {
    //     // console.log(r);
    //   });
    // });
  }

  /**
   * A callback function for when an item or a section is clicked.
   *
   * @param item the associated check list content that was on the clicked element
   */
  itemClicked(item: ChecklistContent): void {
    // if the thing being clicked was a section, open the subtree of that section.
    // otherwise, update the status (or the equivalent of marking the checkbox in paper).
    if (item instanceof ChecklistSection) {
      // console.log(this.checkPreviousComplete(item));
      if (this.checkPreviousComplete(item) === true) {
        this.router.navigateByUrl(
          '/form/' + Object.values(this.routeParams)
            .filter(i => i)
            .join('/') + '/'
          +
          item.title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, ''));
      }
    } else if (item instanceof ChecklistItem) {
      switch (item.status) {
        case ChecklistStatus.None:
          item.status = ChecklistStatus.Ok;
          break;
        case ChecklistStatus.NeedRepair:
          item.status = ChecklistStatus.None;
          break;
        case ChecklistStatus.Ok:
          item.status = ChecklistStatus.NeedRepair;
      }
    }
  }

  /**
   * Update the color of the UI component based on the item status.
   *
   * @param item the associated item that the color will be basing on
   */
  ionItemColor(item: ChecklistContent): string {
    // console.log();
    if (item instanceof ChecklistItem) {
      switch (item.status) {
        case ChecklistStatus.None:
          return '';
        case ChecklistStatus.NeedRepair:
          return 'danger';
        case ChecklistStatus.Ok:
          return 'success';
      }
    } else if (item instanceof ChecklistSection) {
      if (this.checkComplete(item) === true) {
        return 'success';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  /**
   * Update the icon of the UI component based on the item status.
   *
   * @param item the associated item that the color will be basing on
   */
  ionItemIcon(item: ChecklistContent): string {
    if (item instanceof ChecklistItem) {
      switch (item.status) {
        case ChecklistStatus.None:
          return 'radio-button-off';
        case ChecklistStatus.NeedRepair:
          return 'close-circle-outline';
        case ChecklistStatus.Ok:
          return 'checkmark-circle-outline';
      }
    } else {
      return 'arrow-forward';
    }
  }

  /**
   * Get image string contained in the item model
   * @param item the corresponding item model
   */
  getImage(item: ChecklistContent): string {
    if (item instanceof ChecklistItem || item instanceof ChecklistSection) {
      return item.image;
    }
  }

  /**
   * Get comment of the item model to place into input box in the list
   * @param item the corresponding item model
   */
  getCommentText(item: ChecklistContent): string {
    if (item instanceof ChecklistItem) {
      return item.comment;
    }
  }

  /**
   * Get the visibility of the input box in the list.
   *
   * @param item the corresponding checklist item model
   */
  getCommentVisibility(item: ChecklistContent): boolean {
    if (item instanceof ChecklistItem) {
      return item.status === ChecklistStatus.NeedRepair;
    }
  }

  getCurrentCheckList(): Checklist {
    return this.checklistProvider.getCurrentChecklist();
  }

  /**
   * Update the current list to the subtree base on the routing parameters (path in browser)
   */
  getCurrent(): {list: Array<ChecklistContent>, title: string, image: string, item: ChecklistContent} {
    let currentContent: ChecklistContent =  this.currentList.sections;
    for (const key of Object.keys(this.routeParams)) {
      if (currentContent instanceof ChecklistSection && this.routeParams[key]) {
        const nextContent = currentContent.getContents(this.routeParams[key]);
        if (nextContent && nextContent instanceof ChecklistSection) {
          currentContent = nextContent;
        } else {
          break;
        }
      }
    }
    if (currentContent instanceof ChecklistSection) {
      return {list: currentContent.itemList, title: currentContent.title, image: currentContent.image, item: currentContent};
    }
  }


  checkCurrentOnMain(title: string): boolean {
      if (title === 'Pre-Trip' || title === 'Post-Trip') {
          return true;
      }
      return false;
  }

  /**
   * Check whether given item model is of type ChecklistItem
   * @param item is item model
   */
  checkItemTypeIsChecklistItem(item: ChecklistContent): boolean {
    if (item instanceof ChecklistItem) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Check whether item is complete by checking the status
   * @param item the corresponding item model
   */
  checkComplete(item: ChecklistContent): boolean {
    let complete: boolean;
    complete = true;
    if (item instanceof ChecklistItem) {
      switch (item.status) {
        case ChecklistStatus.None:
          // return false;
          complete = false;
          break;
        case ChecklistStatus.NeedRepair:
          // return true;
          complete = true;
          break;
        case ChecklistStatus.Ok:
          // return true;
          complete = true;
      }
    } else if (item instanceof ChecklistSection) {
      item.itemList.forEach(
          function(i) {
            // console.log(i.title);
            if (i instanceof ChecklistItem && i.status === ChecklistStatus.None) {
              // console.log(i.title, 'naw');
              // return false;
              complete = false;
            }
          }
      );
      if (!item.image || item.image === 'data:image/jpeg;base64,') {
          complete = false;
      }
      // return true;
    }
    return complete;
  }

  /**
   * Look at preceding CheckListSection item and checks its completion
   * @param step is current checklistsection to look at
   */
  checkPreviousComplete(step: ChecklistContent): boolean {
    const currentList = this.getCurrent().list;
    if (step instanceof ChecklistSection) {
      for (let i = 0; i < currentList.length; i++) {
        if (i > 0 && currentList[i] === step && currentList[i - 1] instanceof ChecklistSection) {
          return this.checkComplete(currentList[i - 1]);
        }
      }
      return true;
    } else {
      return false;
    }
  }

    /**
     * Goes through entire checklist and returns if entire form is filled out or not
     */
  checkAllComplete(): boolean {
      const currentList = this.getCurrent().list;
      let complete: boolean;
      complete = true;
      for (let i = 0; i < currentList.length; i++) {
          if (currentList[i] instanceof ChecklistSection && !this.checkComplete(currentList[i])) {
              complete = false;
              break;
          }
      }
      if (!this.signature) {
        complete = false;
      }
      return complete;
  }

  /**
   * Check entire progress so far on checklist, returning progress
   */
  getProgress(): number {
    const currentList = this.getCurrent().list;
    let totalProgress = currentList.length;
    let currentProgress = 0;
    for (let i = 0; i < currentList.length; i++) {
      if (this.checkComplete(currentList[i])) {
        currentProgress += 1;
      }
    }
    if (this.getCurrent().item instanceof ChecklistSection) {
      totalProgress += 1;
      if (this.signature || this.getCurrent().item.image) {
        currentProgress += 1;
      }
    }
    return (currentProgress / totalProgress);
  }

  /**
   * Sets respective item model's comment value to specified string
   * @param item is current item model
   * @param comment is current string to set as
   */
  setCommentText(item: ChecklistContent, comment: string): void {
    if (item instanceof ChecklistItem) {
      item.comment = comment;
    }
  }

  /**
   * Goes to previous page, like a back button
   */
  goToPreviousPage() {
    this.navCtrl.pop();
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      for (const key of Object.keys(this.routeParams)) {
        this.routeParams[key] = paramMap.get(key);
      }
    });
  }

  /**
   * Alert Pop-Up for submit confirmation.
   * Cancel stays on Page. Okay leads to logout page.
   */
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to submit?',
      message: '<strong>OKAY</strong> to submit or <strong>CANCEL</strong> to go back.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Okay',
          handler: () => {
            this.navCtrl.navigateForward('/logout');
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Camera
   * - Requires installation of Cordova camera plugin; run 'ionic cordova plugin add cordova-plugin-camera'
   * - Then run 'npm install @ionic-native/camera'
   * - Requires android emulator.
   *    Then use 'ionic cordova build android'  and 'ionic cordova emulate android'
   */
  openCam(item: ChecklistContent) {
    // item.image = 'data:image/jpeg;base64,' + '123'; // temp for testing
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 100,
      targetHeight: 100
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
       // this.image(<any>window).Ionic.WebView.convertFileSrc(imageData);
      if (item instanceof ChecklistItem || item instanceof ChecklistSection) {
        item.image = 'data:image/jpeg;base64,' + imageData;
      }
      // this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      // alert("error " + JSON.stringify(err))
    });
  }// End openCam

  /**
   * load signature string
   */
  loadSignature() {
    this.signature = this.signaturePad.toDataURL();
  }

  /**
   * save signature drawn by user as string onto form
   */
  saveSignature() {
    this.signature = this.signaturePad.toDataURL();
  }

  drawStart() {
    this.drawing = true;
  }

  drawEnd() {
    this.drawing = false;
  }

}
