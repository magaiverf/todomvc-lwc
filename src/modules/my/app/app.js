import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
    @track items = [];
    _items = [];

    addNewItemEvent(event) {
        // check if it's an enter key
        if(event.keyCode === 13) {
            this.addNewItem(event.target.value);

            event.target.value = '';
            return false;
        }
        return true;
    }

    addNewItem(value) {
        this._items.push({Id: this.getNewId(), Name: value, Checked: false});
        this.items = Array.from(this._items);
    }

    // TODO: Add it to a external module and change the assignature to receive the items as parameter
    getNewId() {
        let qtdItems = this._items.length;
        if (qtdItems > 0) {
            return this._items[qtdItems-1].Id + 1;
        }
        return 1;
    }

    getSelected(event) {
        let id = event.target.getAttribute('itemselected');
        this._items.forEach(item => {
            if(item.Id === parseInt(id, 10)) {
                item.Checked = !item.Checked;
            }
        });
    }

    // view all
    showAll() {
        this.items = Array.from(this._items);
    }

    // clear
    clearCompleted() {
        this._items = this._items.filter(item => !item.Checked);
        this.items = Array.from(this._items);
    }

    // active
    showActive() {
        this.items = this._items.filter(item => !item.Checked );
    }

    // completed
    showCompleted() {
        this.items = this._items.filter(item => {
            return item.Checked;
        });
    }
}
