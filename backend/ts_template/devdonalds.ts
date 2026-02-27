import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: Array<cookbookEntry> = [];

// Task 1 helper (don't touch)
app.post("/parse", (req:Request, res:Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input)
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  }
  res.json({ msg: parsed_string });
  return;

});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that
const parse_handwriting = (recipeName: string): string | null => {
  recipeName = recipeName.replace(/[-_ ]+/g,' ').toLowerCase();
  // remove extra whitespace, -,_ and turn everything lowercase
  recipeName = recipeName.replace(/[^a-z A-Z]+/g,'');
  // removes non-letter characters
  recipeName = recipeName.replace(/\b\w/g, letter => letter.toUpperCase());
  // replaces the first letter of every word with a capital
  recipeName.trim();
  if (recipeName.length <= 0) {
    return null;
  }
  return recipeName
}

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req:Request, res:Response) => {
  const entry = req.body;
  if (cookbook.some(e => e.name === entry.name)) {
    return res.status(400).send("entry names must be unique!")
  }
  if (entry.type != 'recipe' && entry.type != 'ingredient') {
    return res.status(400).send("entry type must be 'recipe' or 'ingredient'");
  }
  if (entry.type == 'ingredient' && entry.cookTime < 0) {
    return res.status(400).send("cooktime must be longer than 0");
  }
  if (entry.type === 'recipe') {
    const newEntry: recipe = {
      name: entry.name,
      type: entry.type,
      requiredItems: entry.requiredItems
    }
    cookbook.push(newEntry);
  } else {
    const newEntry :ingredient = {
      name: entry.name,
      type: entry.type,
      cookTime: entry.cookTime
    }
    cookbook.push(newEntry);
  }
  return res.status(200).send("Successful entry")
});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req:Request, res:Request) => {
  // TODO: implement me
  res.status(500).send("not yet implemented!")

});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
