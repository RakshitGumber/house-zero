from pathlib import Path
import joblib
import pandas as pd
import torch
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report
from torch import nn
from torch.utils.data import DataLoader, TensorDataset
from model import SystemOneClassifier

ROOT = Path(__file__).parent
DATA_PATH = ROOT / "data" / "example.csv"
MODEL_DIR = ROOT / "artifacts"
MODEL_DIR.mkdir(parents=True, exist_ok=True)

torch.manual_seed(42)

df = pd.read_csv(DATA_PATH).dropna()
df["text"] = df["text"].astype(str).str.strip()
df = df[df["text"] != ""]

# Keep related examples together in neither split:
# this basic random split is a starting point, not a
# substitute for a genuinely independent test set.
train_texts, test_texts, train_labels, test_labels = train_test_split(
    df["text"].tolist(),
    df["label"].tolist(),
    test_size=0.25,
    random_state=42,
    stratify=df["label"],
)

vectorizer = TfidfVectorizer(
    lowercase=True,
    ngram_range=(1, 2),
    max_features=5000,
)

x_train = vectorizer.fit_transform(train_texts).toarray()
x_test = vectorizer.transform(test_texts).toarray()

label_encoder = LabelEncoder()
y_train = label_encoder.fit_transform(train_labels)
y_test = label_encoder.transform(test_labels)

x_train = torch.tensor(x_train, dtype=torch.float32)
x_test = torch.tensor(x_test, dtype=torch.float32)
y_train = torch.tensor(y_train, dtype=torch.long)
y_test = torch.tensor(y_test, dtype=torch.long)

loader = DataLoader(
    TensorDataset(x_train, y_train),
    batch_size=16,
    shuffle=True,
)

model = SystemOneClassifier(
    input_size=x_train.shape[1],
    num_classes=len(label_encoder.classes_),
)

optimizer = torch.optim.Adam(
    model.parameters(),
    lr=0.001,
)
criterion = nn.CrossEntropyLoss()

for epoch in range(50):
    model.train()
    total_loss = 0.0

    for features, labels in loader:
        optimizer.zero_grad()

        logits = model(features)
        loss = criterion(logits, labels)

        loss.backward()
        optimizer.step()

        total_loss += loss.item()

    if (epoch + 1) % 10 == 0:
        print(f"Epoch {epoch + 1}: " f"loss={total_loss / len(loader):.4f}")

model.eval()
with torch.no_grad():
    predictions = model(x_test).argmax(dim=1)

print(
    classification_report(
        y_test.numpy(),
        predictions.numpy(),
        labels=list(range(len(label_encoder.classes_))),
        target_names=label_encoder.classes_,
        zero_division=0,
    )
)

# Save weights and the matching preprocessing objects.
torch.save(
    model.state_dict(),
    MODEL_DIR / "model.pt",
)
joblib.dump(vectorizer, MODEL_DIR / "vectorizer.joblib")
joblib.dump(label_encoder, MODEL_DIR / "labels.joblib")

print(f"Saved artifacts to {MODEL_DIR}")
