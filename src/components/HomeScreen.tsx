
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import RichTextEditor from "@/components/RichTextEditor";

interface HomeScreenProps {
  user: { name: string; email: string; avatar?: string } | null;
  onLogout: () => void;
}

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  createdAt: number;
}

const HomeScreen = ({ user, onLogout }: HomeScreenProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState("");

  const categories = ["General", "Meeting", "To-Do", "Ideas", "Personal"];

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setNotes(parsedNotes);
      
      // Set the first note as active if there are notes
      if (parsedNotes.length > 0) {
        const firstNote = parsedNotes[0];
        setActiveNoteId(firstNote.id);
        setEditorContent(firstNote.content);
      }
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout and return to the login screen?")) {
      onLogout();
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesCategory = note.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeNote = notes.find(note => note.id === activeNoteId);

  const handleNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content: "",
      category: selectedCategory,
      date: new Date().toLocaleDateString("en-GB", { 
        day: "numeric", 
        month: "short", 
        year: "numeric" 
      }),
      createdAt: Date.now()
    };
    
    setNotes(prev => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
    setEditorContent("");
  };

  const handleContentChange = (content: string) => {
    setEditorContent(content);
    
    if (activeNoteId) {
      setNotes(prev => prev.map(note => 
        note.id === activeNoteId 
          ? { ...note, content, title: content.slice(0, 50) || "Untitled Note" }
          : note
      ));
    }
  };

  const handleNoteSelect = (note: Note) => {
    setActiveNoteId(note.id);
    setEditorContent(note.content);
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-GB", { 
      weekday: "long",
      day: "numeric", 
      month: "long", 
      year: "numeric" 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">EveryNote</h1>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <Input
                placeholder="Search your notes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 w-64"
              />
            </div>

            {/* Calendar Icon */}
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Button>

            {/* User Avatar and Logout */}
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-gray-600 text-white text-sm">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm text-gray-300">
                {user?.name}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="text-gray-300 border-gray-600 hover:bg-gray-700 hover:text-white"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-2 pb-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className={`cursor-pointer transition-colors whitespace-nowrap ${
                    selectedCategory === category 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Notes List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Notes</h3>
              <Button 
                onClick={handleNewNote}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                size="sm"
              >
                + New Note
              </Button>
            </div>

            <ScrollArea className="h-[calc(100vh-300px)]">
              <div className="space-y-2">
                {filteredNotes.map((note) => (
                  <Card 
                    key={note.id}
                    className={`bg-gray-800/50 border-gray-700 p-3 cursor-pointer transition-colors ${
                      activeNoteId === note.id ? "border-blue-500 bg-gray-700/50" : "hover:bg-gray-700/30"
                    }`}
                    onClick={() => handleNoteSelect(note)}
                  >
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-white truncate">
                        {note.title}
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-2">
                        {note.content.replace(/<[^>]*>/g, '').slice(0, 100) || "No content"}
                      </p>
                      <p className="text-xs text-gray-500">{note.date}</p>
                    </div>
                  </Card>
                ))}
                
                {filteredNotes.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <p>No notes in {selectedCategory}</p>
                    <p className="text-sm mt-1">Create your first note</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Editor */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-800/50 border-gray-700 h-full">
              {activeNote ? (
                <div className="p-6 h-full flex flex-col">
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm">{getCurrentDate()}</p>
                  </div>
                  
                  <div className="flex-1">
                    <RichTextEditor
                      content={editorContent}
                      onChange={handleContentChange}
                      placeholder="What's on your mind today?"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-lg">Select a note to start editing</p>
                    <p className="text-sm text-gray-600 mt-1">Or create a new note to get started</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
