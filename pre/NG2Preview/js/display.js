/**
 * Created by liuhan on 2015/9/1.
 */

function DisplayComponent(friends) {
    this.myName = "Alice";
    this.names = friends.names;

    this.addFriend = function(name) {
        this.names.push(name);
    };

    this.doneTyping = function($event) {
        if($event.which === 13) {
            this.addFriend($event.target.value);
            $event.target.value = null;
        }
    };
}

DisplayComponent.annotations = [
    new angular.ComponentAnnotation({
        selector: "display",
        appInjector: [FriendsService]
    }),
    new angular.ViewAnnotation({
        templateUrl : 'html/display.html',
        directives: [angular.NgFor,angular.NgIf]
    })
];

DisplayComponent.parameters = [[FriendsService]];

function FriendsService() {
    this.names = ["Aarav", "Martin", "Shannon", "Ariana", "Kai"];
}
