"use client";
import { supabase } from "@/lib/supabase";
import React, { useState } from "react";

interface NotesSectionProps {
  recipeId: string;
  initialNotes: { id: string; note: string; created_at: string }[];
}

const NotesSection: React.FC<NotesSectionProps> = ({
  recipeId,
  initialNotes,
}) => {
  const [notes, setNotes] = useState(initialNotes);
  const [text, setText] = useState("");
  const [openAddNote, setOpenAddNote] = useState(false);

  const changeDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleSave = async () => {
    const { data, error } = await supabase
      .from("recipe_notes")
      .insert({ recipe_id: recipeId, note: text })
      .select()
      .single();

    if (error) {
      console.log("Gagal simpan catatan.", error);
      return;
    }
    setNotes([data, ...notes]);
    setText("");
  };

  return (
    <div>
      <div className="flex items-center gap-2 mt-5 mb-2">
        <h2 className="font-display text-base text-ink">Catatan</h2>
        <div className="flex-1 border-b-2 border-dashed border-paper-shadow" />
      </div>

      <div className="flex flex-col gap-2">
        {notes.length === 0 ? (
          <p className="text-ink/40">Belum ada catatan</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="w-full px-3 py-1.5 border-2 border-ink wobble-c"
            >
              <p className="text-sm text-ink/60">
                {changeDate(note.created_at)}
              </p>
              <p>{note.note}</p>
            </div>
          ))
        )}

        <button
          onClick={() => setOpenAddNote(true)}
          className="w-full mt-2 py-1.5 border-2 border-dashed border-ink/60 wobble-c text-ink/60 cursor-pointer"
        >
          + tambah catatan
        </button>
        {openAddNote && (
          <div className="flex gap-2 mt-2">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={2}
              className="border-2 border-ink rounded-xl w-full px-3 py-1.5"
              placeholder="Tulis catatan..."
            />
            <button
              className="px-3 py-1.5 border-2 border-ink bg-yellow rounded-xl cursor-pointer"
              onClick={handleSave}
            >
              Simpan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesSection;
