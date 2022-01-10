const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find( (note) => note.title === title );

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green('New note added!'));

  } else {
    console.log(chalk.red('Note title taken!'));

  }
}

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter( (note) => note.title !== title );

  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green("Successfully removed note!"));

  } else {
    console.log(chalk.red('Note not found!'));

  }
}

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue("Here are your notes!"));

  debugger

  notes.forEach(element => {
    console.log(element.title);
  });
}

const readNote = (title) => {
  const notes = loadNotes();
  const targetNote = notes.find( (note) => note.title === title);

  if (targetNote) {
    console.log(chalk.blue(targetNote.title));
    console.log(targetNote.body);

  } else {
    console.log(chalk.red('Note not found!'));

  }  
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);

}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);

  } catch (e) {
    return [];

  }
}

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
}