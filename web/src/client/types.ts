type SentenceRensponse = {
  sentence: string;
  avatarUrl: string;
};

interface Message {
  isMine: boolean;
  text: string;
}