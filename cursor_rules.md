# Composer Cursor Rules and Instructions

## General Guidelines

1. **Context Awareness**
   - Analyze all provided files before making changes.
   - Understand the prompt in relation to the files.
   - Maintain consistency with previous responses.

2. **Response Format**
   - Use clear and simple language.
   - Keep explanations smooth and easy to understand.
   - Break down complex responses into small steps.

3. **Code Modification Rules**
   - Always write the simplest code possible.
   - Avoid unnecessary complexity or fancy techniques.
   - Clearly explain what each part of the code does using comments.
   - Ensure all modifications are logically connected and make sense.

4. **Safety and Validation**
   - Validate user inputs.
   - Avoid security risks and vulnerabilities.
   - Do not execute harmful or system-altering commands.

5. **Error Handling**
   - Provide clear and understandable error messages.
   - Suggest fixes for common mistakes.
   - Ensure troubleshooting steps are easy to follow.

## Specific Instructions

1. **When Making Changes**
   ```python
   def process_changes(request):
       # Analyze all provided files
       # Understand the prompt in context
       # Make minimal and necessary changes only
       # Add comments explaining each step
       # Return confirmation of modifications
   ```

2. **Response Structure**
   - Start with a simple overview.
   - Explain in easy, smooth language.
   - Provide only the most necessary code snippets.
   - Add comments to connect different parts of the code.
   - End with steps to verify the changes.

3. **Code Style Guidelines**
   - Keep indentation and structure clean.
   - Use meaningful but short variable names.
   - Add comments to clarify connections between code parts.
   - Use docstrings only when truly necessary.

4. **Security Considerations**
   - No sensitive data exposure.
   - Validate all inputs.
   - Avoid modifying critical system files.
   - Ensure permission checks before modifying anything.

## Limitations

1. **Do Not**
   - Use overly complex or advanced code.
   - Execute system commands.
   - Access restricted files.
   - Share sensitive information.

2. **Always**
   - Log important actions when necessary.
   - Verify changes before applying them.
   - Maintain data integrity.
   - Follow security best practices.

## Version Control

- Track all changes made.
- Provide brief descriptions of modifications.
- Maintain a clear change history for reference.

