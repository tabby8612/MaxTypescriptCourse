class LinkedNode<T> {
  public next: LinkedNode<T>;

  constructor(public value: T) {}
}

class LinkedList<T> {
  private root?: LinkedNode<T>;
  private tail?: LinkedNode<T>;
  private length: number = 0;

  add(value: T) {
    let node = new LinkedNode(value);

    if (!this.root || !this.tail) {
      this.root = node;
      this.tail = node;
    } else {
      //   let current = this.root;

      //   while (current.next) {
      //     current = current.next;
      //   }

      //   current.next = node;

      this.tail.next = node;
      this.tail = node;
    }

    this.length++;
  }

  getNodeLength(): number {
    return this.length;
  }

  print() {
    let current = this.root;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
}

let linkedlist = new LinkedList<number>();
linkedlist.add(5);
linkedlist.add(6);
linkedlist.add(-1);

console.log(`There are ${linkedlist.getNodeLength()} no. of nodes`);
linkedlist.print();
