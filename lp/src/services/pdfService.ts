import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { InventoryState, ItemType } from "../types";

export const generateInventoryPDF = (inventory: InventoryState) => {
  const doc = new jsPDF();
  const date = new Date();
  const dateString = date.toLocaleDateString('pl-PL');
  const timeString = date.toLocaleTimeString('pl-PL');

  // Title
  doc.setFontSize(18);
  doc.text("Raport Magazynowy Piekarni", 14, 22);
  
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Data: ${dateString} ${timeString}`, 14, 30);

  // Define data for the table
  const tableData = [
    ["Nazwa", "Typ", "Rozmiar", "Ilość"],
    ["Forma (Obręcz)", "Forma", "22 cm", inventory[ItemType.MOLD_22]],
    ["Dno", "Dno", "22 cm", inventory[ItemType.BOTTOM_22]],
    ["Forma (Obręcz)", "Forma", "26 cm", inventory[ItemType.MOLD_26]],
    ["Dno", "Dno", "26 cm", inventory[ItemType.BOTTOM_26]],
  ];

  // Logic to calculate sets
  const sets22 = Math.min(inventory[ItemType.MOLD_22], inventory[ItemType.BOTTOM_22]);
  const sets26 = Math.min(inventory[ItemType.MOLD_26], inventory[ItemType.BOTTOM_26]);

  const summaryData = [
    ["Kompletne zestawy (22cm)", sets22],
    ["Kompletne zestawy (26cm)", sets26],
  ];

  // Main Inventory Table
  // Cast to any because autoTable adds itself to the prototype but TS might miss it depending on config
  (doc as any).autoTable({
    head: [tableData[0]],
    body: tableData.slice(1),
    startY: 40,
    theme: 'grid',
    styles: { fontSize: 12, cellPadding: 3 },
    headStyles: { fillColor: [66, 66, 66] }
  });

  // Summary Table
  const finalY = (doc as any).lastAutoTable?.finalY || 60;
  
  doc.text("Podsumowanie", 14, finalY + 15);
  
  (doc as any).autoTable({
    body: summaryData,
    startY: finalY + 20,
    theme: 'striped',
    styles: { fontSize: 12 },
  });

  // Save
  const fileName = `inwentaryzacja_${date.toISOString().slice(0,10)}.pdf`;
  doc.save(fileName);
};