var LinkedNode = /** @class */ (function () {
    function LinkedNode(value) {
        this.value = value;
    }
    return LinkedNode;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.length = 0;
    }
    LinkedList.prototype.add = function (value) {
        var node = new LinkedNode(value);
        if (!this.root || !this.tail) {
            this.root = node;
            this.tail = node;
        }
        else {
            //   let current = this.root;
            //   while (current.next) {
            //     current = current.next;
            //   }
            //   current.next = node;
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    };
    LinkedList.prototype.getNodeLength = function () {
        return this.length;
    };
    LinkedList.prototype.print = function () {
        var current = this.root;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    };
    return LinkedList;
}());
var linkedlist = new LinkedList();
linkedlist.add(5);
linkedlist.add(6);
linkedlist.add(-1);
console.log("There are ".concat(linkedlist.getNodeLength(), " no. of nodes"));
linkedlist.print();
