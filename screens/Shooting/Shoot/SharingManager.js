import {ViewShot, captureScreen} from "react-native-view-shot";
import {Share} from "react-native";

export default class SharingManager {

    excludeShareingpackages = [
        'com.apple.UIKit.activity.PostToWeibo',
        'com.apple.UIKit.activity.Print',
        'com.apple.UIKit.activity.CopyToPasteboard',
        'com.apple.UIKit.activity.AssignToContact',
        'com.apple.UIKit.activity.SaveToCameraRoll',
        'com.apple.UIKit.activity.AddToReadingList',
        'com.apple.UIKit.activity.PostToFlickr',
        'com.apple.UIKit.activity.PostToVimeo',
        'com.apple.UIKit.activity.PostToTencentWeibo',
        'com.apple.UIKit.activity.AirDrop',
        'com.apple.UIKit.activity.OpenInIBooks',
        'com.apple.UIKit.activity.MarkupAsPDF',
        'com.apple.reminders.RemindersEditorExtension',
        'com.apple.mobilenotes.SharingExtension',
        'com.apple.mobileslideshow.StreamShareService'
    ];

    constructor() {

    }

    shareTarget(uri) {
        captureScreen({
            format: "png",
            quality: 0.8,
            width: 1080,
            height: 1350
        }).then(
            (uri) => {
                try {
                    Share.share(
                        {
                            title: 'My last drill',
                            url: uri,
                            message: 'You think you can do better? :)'
                        },
                        {
                            excludedActivityTypes: this.excludeShareingpackages,
                        });

                } catch (error) {
                    console.log('Error =>', error);
                }
            },
            error => console.error("Oops, snapshot failed", error)
        );
    }

}
