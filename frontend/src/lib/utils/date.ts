import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

// Formater une date en heure (ex: "14:30:45")
export function formatTime(date: Date | number) {
  return format(new Date(date), 'HH:mm:ss', { locale: fr });
}

// Formater une date complète (ex: "30 janvier 2026 à 14:30")
export function formatDateTime(date: Date | number) {
  return format(new Date(date), "d MMMM yyyy 'à' HH:mm", { locale: fr });
}

// Temps relatif (ex: "il y a 5 minutes")
export function formatRelative(date: Date | number) {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: fr });
}
