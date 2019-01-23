import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public reminders = [];
  public reorderIsEnabled = false;

  constructor(public navCtrl: NavController, private alertController: AlertController, private toastController: ToastController) {

  }

  archiveReminder(reminderIndex) {

  }
  deleteReminder(reminder) {
    let index = this.reminders.indexOf(reminder);

    if (index > -1) {
      this.reminders.splice(index, 1);
      let deleteReminderToast = this.toastController.create({
        message: "Your reminder is deleted",
        duration: 2000
      });
      deleteReminderToast.present();
    }
  }
  toggleReorder() {
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered($event) {
    reorderArray(this.reminders, $event);
  }

  addReminder() {
    let addReminderAlert = this.alertController.create({
      title: "Add a reminder",
      inputs: [
        {
          placeholder: "Text",
          name: "addReminderInput",
        },
        {
          name: 'addDueDateInput',
          type: 'date'
        },
        {
          name: 'addDueTimeInput',
          type: 'time'
        },
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add Reminder",
          handler: (inputData) => {
            this.reminders.push({
              text: inputData.addReminderInput,
              dueDate: inputData.addDueDateInput,
              dueTime: inputData.addDueTimeInput,
            });

            let addReminderToast = this.toastController.create({
              message: "Your reminder is added",
              duration: 2000
            });
            addReminderToast.present();

            // Schedule
            if (inputData.addDueDateInput && inputData.addDueTimeInput) {
              const due = new Date(inputData.addDueDateInput + ' ' + inputData.addDueTimeInput);
              const now = new Date();

              if (due > now) {
                let schedule = this.alertController.create({
                  title: "Reminder",
                  subTitle: inputData.addReminderInput,
                  buttons: [{
                    text: "Ok"
                  }]
                });

                setTimeout(()=>{
                  schedule.present();
                }, due.getTime() - now.getTime());

              }
            }
          }
        }]


    });
    addReminderAlert.present()
  }

}
