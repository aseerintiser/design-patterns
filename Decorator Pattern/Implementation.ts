interface Text {
    modifyText(): string
}

class PlainText implements Text {

    userText: string

    constructor(userText: string) {
        this.userText = userText
    }

    public modifyText(): string {
        return this.userText;
    }
}

class TextDecorator implements Text {
    protected textContent: Text;

    constructor(textContent: Text) {
        this.textContent = textContent;
    }

    public modifyText(): string {
        return this.textContent.modifyText();
    }
}

class BoldDecorator extends TextDecorator {
    public modifyText(): string {
        return super.modifyText().bold();
    }
}

class ItalicDecorator extends TextDecorator {
    public modifyText(): string {
        return super.modifyText().italics();
    }
}

class StrikeOutDecorator extends TextDecorator {
    public modifyText(): string {
        return super.modifyText().strike();
    }
}

function showOutput(textContent: Text) {
    console.log(`${textContent.modifyText()}`);
}


const plain = new PlainText('Hello, World');
const d1 = new BoldDecorator(plain);
const d2 = new ItalicDecorator(d1);
const d3 = new StrikeOutDecorator(d2);

showOutput(plain);
showOutput(d1);
showOutput(d2);
showOutput(d3);
