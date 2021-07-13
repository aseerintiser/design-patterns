interface Observable {
    addObserver(observer: Observer): void;
    removeObserver(observer: Observer): void;
    notifyObservers(): void;
}


class ClassData implements Observable {
    courseNo!: string;
    topicName!: string;
    teacherName!: string;
    time!: string
    private observers: Array<Observer> = []

    addObserver(observer: Observer): void {
        this.observers.push(observer)
        this.notifyObservers()
    }
 
    removeObserver(observer: Observer): void {
        this.observers = this.observers.filter(obj => obj !== observer)
    }
 
    notifyObservers(): void {
        for(const observer of this.observers){
            observer.update(this.courseNo, this.topicName, this.teacherName, this.time);
        }
    }

    measuredChanged(courseNo: string, topicName: string, teacherName: string, time: string): void {
        this.courseNo = courseNo
        this.topicName = topicName
        this.teacherName = teacherName
        this.time = time
        this.notifyObservers()
    }
}


interface Observer {
    update(courseNo: string, topicName: string, teacherName: string, time: string): void;
}


class TeacherDisplay implements Observer {
    courseNo!: string;
    topicName!: string;
    teacherName!: string;
    time!: string;

    update(courseNo: string, topicName: string, teacherName: string, time: string): void {
        this.courseNo = courseNo;
        this.topicName = topicName;
        this.teacherName = teacherName;
        this.time = new Date(time).toLocaleString('en-us',{hour12:false});
    }

    show(): void {
        console.log(`This is Teacher Display`);
        console.log(`Course No: ${this.courseNo}`);
        console.log(`Topic: ${this.topicName}`);
        console.log(`Teacher: ${this.teacherName}`);
        console.log(`Time: ${this.time}`);
    }
}


class StudentDisplay implements Observer {
    courseNo!: string;
    topicName!: string;
    teacherName!: string;
    time!: string;

    update(courseNo: string, topicName: string, teacherName: string, time: string): void {
        this.courseNo = courseNo;
        this.topicName = topicName;
        this.teacherName = teacherName;
        this.time = new Date(time).toLocaleString('en-us',{hour12:true});
    }

    show(): void {
        console.log(`This is Student Display`);
        console.log(`Course No: ${this.courseNo}`);
        console.log(`Topic: ${this.topicName}`);
        console.log(`Teacher: ${this.teacherName}`);
        console.log(`Time: ${this.time}`);
    }
}



var classData = new ClassData()


var student1 = new StudentDisplay()
classData.addObserver(student1)
classData.measuredChanged('SWE-4501','Observer Pattern','Nazmul Haque Sir','10.07.2021, 23:54')
student1.show()

var student2 = new StudentDisplay()
classData.addObserver(student2)
classData.measuredChanged('SWE-4501','Observer Pattern','Nazmul Haque Sir','08.07.2021, 23:55')
student2.show()

classData.removeObserver(student2)
classData.measuredChanged('SWE-4501','Observer Pattern','Nazmul Haque Sir','08.07.2021, 23:56')
student2.show()


var teacher1 = new TeacherDisplay()
classData.addObserver(teacher1)
classData.measuredChanged('SWE-4501','Observer Pattern','Nazmul Haque Sir','08.07.2021, 23:57')
teacher1.show()

